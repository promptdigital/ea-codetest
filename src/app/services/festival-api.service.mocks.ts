import { Festival, RecordLabelList } from "../shared/models";

export const FESTIVAL_RESPONSE_MOCK: Festival[] = [
  {
     "name":"Omega Festival",
     "bands":[
        {
          "name":"Band X",
          "recordLabel":"Record Label 1"
        }
     ]
  },
  {
    "name": "",
    "bands": [
      {
        "name":"Band Y",
        "recordLabel":"Record Label 1"
      }
    ]
  },
  {
    "name":"Alpha Festival",
    "bands":[
      {
        "name":"Band A",
        "recordLabel":"Record Label 2"
      }
    ]
  },
  {
    "name":"Beta Festival",
    "bands":[
       {
          "name":"Band A",
          "recordLabel":"Record Label 2"
       }
    ]
  },
  {
    "name":"Gamma Festival",
    "bands":[
       {
          "name":"Band C",
          "recordLabel":""
       }
    ]
  }
];

export const RECORD_LABELS_MOCK: RecordLabelList = {
  "Record Label 1": {
    "Band X": [
      { "name": "Omega Festival" },
    ],
    "Band Y": [
      { "name": "N/A" }
    ]
  },
  "Record Label 2": {
    "Band A": [
      { "name": "Alpha Festival" },
      { "name": "Beta Festival" }
    ]
  },
  "N/A": {
    "Band C": [
      { "name": "Gamma Festival" },
    ]
  }
}
