import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
  Field,
  Input,
  makeStyles,
  tokens,
  Spinner,
} from "@fluentui/react-components";
import { Settings24Regular } from "@fluentui/react-icons";
import { ISettings } from "../interfaces";

const API_BASE = "https://localhost:7236";

const useStyles = makeStyles({
  triggerWrapper: {
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    borderTopColor: tokens.colorNeutralStroke2,
    marginTop: "16px",
    paddingTop: "8px",
  },
  triggerBtn: {
    width: "100%",
    bottom: "100px",
  },
  field: {
    marginBottom: tokens.spacingVerticalM,
  },
  saveRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
});

async function fetchSettings(): Promise<ISettings> {
  const res = await fetch(`${API_BASE}/print/settings`);
  if (!res.ok) throw new Error("Failed to load settings");
  const data = await res.json();
  return {
    printerName: data.printerName ?? "",
    zplSavePath: data.zplSavePath ?? "",
    pdfSavePath: data.pdfSavePath ?? "",
  };
}

async function postSettings(settings: ISettings): Promise<void> {
  const res = await fetch(`${API_BASE}/print/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      printerName: settings.printerName,
      zplSavePath: settings.zplSavePath,
      pdfSavePath: settings.pdfSavePath,
    }),
  });
  if (!res.ok) throw new Error("Failed to save settings");
}

interface ISettingsDialogProps {
  onSettingsChange: (settings: ISettings) => void;
}

const SettingsDialog = ({ onSettingsChange }: ISettingsDialogProps) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<ISettings>({
    printerName: "",
    zplSavePath: "",
    pdfSavePath: "",
  });

  // Load settings from backend on mount
  useEffect(() => {
    fetchSettings()
      .then((s) => {
        setDraft(s);
        onSettingsChange(s);
      })
      .catch(() => {});
  }, []);

  const handleOpen = () => {
    fetchSettings()
      .then(setDraft)
      .catch(() => {});
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await postSettings(draft);
      onSettingsChange(draft);
      setOpen(false);
    } catch (err) {
      console.error("Could not save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className={styles.triggerWrapper}>
        <Button
          className={styles.triggerBtn}
          appearance="subtle"
          icon={<Settings24Regular />}
          onClick={handleOpen}
        >
          Settings
        </Button>
      </div>

      <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Printer Settings</DialogTitle>
            <DialogContent>
              <Field label="Printer Name" className={styles.field}>
                <Input
                  value={draft.printerName}
                  placeholder="e.g. ZDesigner ZT421-203dpi ZPL"
                  onChange={(_, d) => setDraft(prev => ({ ...prev, printerName: d.value }))}
                />
              </Field>
              <Field label="ZPL Export Folder" className={styles.field}>
                <Input
                  value={draft.zplSavePath}
                  placeholder="e.g. C:\Exports\Labels"
                  onChange={(_, d) => setDraft(prev => ({ ...prev, zplSavePath: d.value }))}
                />
              </Field>
              <Field label="PDF Export Folder" className={styles.field}>
                <Input
                  value={draft.pdfSavePath}
                  placeholder="e.g. C:\Exports\Labels"
                  onChange={(_, d) => setDraft(prev => ({ ...prev, pdfSavePath: d.value }))}
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <div className={styles.saveRow}>
                {saving && <Spinner size="tiny" />}
                <Button appearance="primary" onClick={handleSave} disabled={saving}>
                  Save
                </Button>
              </div>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default SettingsDialog;
