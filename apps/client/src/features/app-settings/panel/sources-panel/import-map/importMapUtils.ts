import { ImportCustom, ImportMap } from 'ontime-utils';

export type NamedImportMap = typeof namedImportMap;

// Record of label and import name
export const namedImportMap = {
  Worksheet: 'event schedule',
  Start: 'time start',
  'Link start': 'link start',
  End: 'time end',
  Duration: 'duration',
  Cue: 'cue',
  Title: 'title',
  'Count to end': 'count to end',
  'Is Public': 'public',
  Skip: 'skip',
  Note: 'notes',
  Colour: 'colour',
  'End action': 'end action',
  'Timer type': 'timer type',
  'Time warning': 'warning time',
  'Time danger': 'danger time',
  ID: 'id',
  custom: [] as ImportCustom[],
};

function isNamedImportMap(obj: unknown): obj is NamedImportMap {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const keys = Object.keys(namedImportMap);
  return keys.every((key) => Object.hasOwn(obj, key));
}

export function convertToImportMap(namedImportMap: NamedImportMap): ImportMap {
  const custom = namedImportMap.custom.reduce((accumulator, { ontimeName, importName }) => {
    if (ontimeName && importName) {
      accumulator[ontimeName.trim()] = importName.trim();
    }
    return accumulator;
  }, {});

  return {
    worksheet: namedImportMap.Worksheet,
    timeStart: namedImportMap.Start,
    linkStart: namedImportMap['Link start'],
    timeEnd: namedImportMap.End,
    duration: namedImportMap.Duration,
    cue: namedImportMap.Cue,
    title: namedImportMap.Title,
    countToEnd: namedImportMap['Count to end'],
    isPublic: namedImportMap['Is Public'],
    skip: namedImportMap.Skip,
    note: namedImportMap.Note,
    colour: namedImportMap.Colour,
    endAction: namedImportMap['End action'],
    timerType: namedImportMap['Timer type'],
    timeWarning: namedImportMap['Time warning'],
    timeDanger: namedImportMap['Time danger'],
    custom,
    entryId: namedImportMap.ID,
  };
}

export function persistImportMap(options: NamedImportMap) {
  localStorage.setItem('ontime-import-options', JSON.stringify(options));
}

function getPersistImportMap(): unknown {
  const options = localStorage.getItem('ontime-import-options');
  if (!options) {
    throw new Error('no import options found');
  }
  return JSON.parse(options);
}

export function getPersistedOptions(): NamedImportMap {
  try {
    const options = getPersistImportMap();
    if (!isNamedImportMap(options)) {
      return namedImportMap;
    }
    return options;
  } catch {
    return namedImportMap;
  }
}
