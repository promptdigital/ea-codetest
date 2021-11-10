export interface ErrorMessage {
  message: string;
}

export interface Festival {
  name?: string;
  bands?: Band[];
}

export interface Band {
  name: string;
  recordLabel: string;
  festival?: string;
}

export interface RecordLabelList {
  [key: string]: BandList
}

export interface RecordLabelBands {
  [key: string]: Band[]
}

export interface BandList {
  [key: string]: Festival[]
}
