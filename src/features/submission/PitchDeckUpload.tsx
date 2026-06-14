import { FileText } from 'lucide-react'
import { Badge } from '@/components/ui'
import { formatFileSize, validatePitchDeck } from './schema'

interface PitchDeckUploadProps {
  disabled?: boolean
  existingName?: string
  pitchFile: File | null
  pitchError: string | null
  onSelect: (file: File | null, error: string | null) => void
}

export function PitchDeckUpload({
  disabled,
  existingName,
  pitchFile,
  pitchError,
  onSelect,
}: PitchDeckUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const err = validatePitchDeck(file)
    if (err) {
      onSelect(null, err)
      return
    }
    onSelect(file, null)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="pitch-deck" className="text-sm font-medium text-text-secondary">
        Pitch deck (PDF, max 10 MB)
      </label>
      <input
        id="pitch-deck"
        type="file"
        accept=".pdf"
        disabled={disabled}
        onChange={handleChange}
        className="text-sm text-text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-accent/15 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent disabled:opacity-60"
      />
      {pitchError && <span className="text-xs text-danger">{pitchError}</span>}
      {(pitchFile ?? existingName) && !pitchError && (
        <div className="flex items-center gap-2 text-sm text-text-primary">
          <FileText className="h-4 w-4 text-text-secondary" aria-hidden="true" />
          {pitchFile?.name ?? existingName}
          {pitchFile && <Badge variant="default">{formatFileSize(pitchFile.size)}</Badge>}
        </div>
      )}
    </div>
  )
}
