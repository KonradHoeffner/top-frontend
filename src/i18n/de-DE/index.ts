export default {
  category: 'Kategorie|Kategorien',
  missing_value: 'Fehlender Wert|Fehlende Werte',
  phenotype_group: 'Phänotypgruppe|Phänotypgruppen',
  single_phenotype: 'Einzelner Phänotyp|Einzelne Phänotypen',
  combined_phenotype: 'Kombinierter Phänotyp|Kombinierte Phänotypen',
  derived_phenotype: 'Abgeleiteter Phänotyp|Abgeleitete Phänotypen',
  single_restriction: 'Einzelne Restriktion|Einzelne Restriktionen',
  combined_restriction: 'Kombinierte Restriktion|Kombinierte Restriktionen',
  derived_restriction: 'Abgeleitete Restriktion|Abgeleitete Restriktionen',
  dataType: 'Datentyp|Datentypen',
  number: 'Zahl|Zahlen',
  boolean: 'Boolesch',
  date: 'Datum|Daten',
  date_time: 'Datum und Zeit|Daten und Zeiten',
  timestamp: 'Zeitstempel',
  string: 'Text|Texte',
  title: 'Titel',
  describingMetadata: 'Beschreibende Metadaten',
  synonym: 'Synonym|Synonyme',
  description: 'Beschreibung|Beschreibungen',
  ok: 'OK',
  cancel: 'Abbrechen',
  entry: 'Eintrag|Einträge',
  addThing: '{thing} hinzufügen',
  oneThingPerThing: 'Es kann nur ein {thing1} pro {thing2} existieren!',
  language: 'Sprache|Sprachen',
  remove: 'Entfernen',
  delete: 'Löschen',
  score: 'Ergebnis',
  component: 'Komponente',
  restriction: 'Restriktion',
  expression: 'Ausdruck',
  class: 'Klasse',
  union: 'Vereinigung',
  intersection: 'Durchschnitt',
  complement: 'Komplement',
  and: 'und',
  or: 'oder',
  not: 'nicht',
  expand: 'Erweitern',
  clearAll: 'Alles löschen',
  show: 'Anzeigen',
  filter: 'Filter',
  operator: 'Operator',
  operand: 'Operand',
  setting: 'Einstellung|Einstellungen',
  indentWithSpaces: 'Einrücken mit Leerzeichen',
  confirmClearExpression: 'Bitte bestätigen Sie, dass Sie den aktuellen Ausdruck löschen möchten.',
  confirmDiscardChanges: 'Bitte bestätigen Sie, dass Sie die aktuellen Änderungen verwerfen möchten.',
  selectThing: '{thing} auswählen',
  save: 'Speichern',
  reset: 'Zurücksetzen',
  entity: 'Entität|Entitäten',
  value: 'Wert|Werte',
  enumeration: 'Aufzählung|Aufzählungen',
  valueRange: 'Wertebereich|Wertebereiche',
  pleaseWait: 'Bitte warten',
  reload: 'Neu laden',
  dismiss: 'Verwerfen',
  notFound: 'Nicht gefunden',
  negated: 'Negiert',
  quantor: 'Quantor|Quantoren',
  loading: 'Laden',
  unnamedEntity: 'Unbenannte Entität',
  showThing: '{thing} anzeigen',
  help: 'Hilfe',
  version: 'Version|Versionen',
  versionHistory: 'Versionsverlauf',
  noDataPresent: 'Keine Daten verfügbar',
  close: 'Schließen',
  author: 'Autor',
  restoreThing: '{thing} wiederherstellen',
  invalid: 'Ungültig',
  valid: 'Gültig',
  unit: 'Einheit|Einheiten',
  developPhenotype: 'Phänotyp entwickeln|Phänotypen entwickeln',
  repository: 'Repositorium|Repositorien',
  organisation: 'Organisation|Organisationen',
  collaborativeWork: 'Kollaborative Arbeit',
  formula: 'Formel|Formeln',
  closeAll: 'Alle schließen',
  code: 'Code|Codes',
  condition: 'Bedingung|Bedingungen',
  squareRoot: 'Quadratwurzel',
  exponent: 'Exponent|Exponenten',
  base: 'Basis|Basen',
  addition: 'Addition|Additionen',
  subtraction: 'Subtraktion|Subtraktionen',
  multiplication: 'Multiplikation|Multiplikationen',
  division: 'Division|Divisionen',
  searchThing: '{thing} suchen',
  entityEditor: {
    rawBtn: {
      label: 'Zeige Entität-Daten als JSON'
    },
    rawDialog: {
      content: 'Aktueller Zustand der Entität'
    },
    titlesHelp: 'Sie können je Sprache genau einen Titel angeben. Die Titel sollten dabei kurz und verständlich sein. '
      + 'Bei der Darstellung einer Entität wird der für die aktuelle Spracheinstellung passende Titel gewählt. '
      + 'Ist für die Spracheinstellung kein passender Titel angegeben, wird der erste Eintrag in der Liste verwendet.',
    synonymsHelp: 'Synonyme sind alternative Bezeichnungen für Entitäten. Beispielsweise könnte der Phänotyp "BMI" das Synonym "Body Mass Index" besitzen.',
    descriptionsHelp: 'Hier können Sie weiterführende Beschreibungen oder Definitionen der Entität in verschiedenen Sprachen angeben.',
    codesHelp: 'Geben Sie in diesem Abschnitt Verknüpfungen zu Taxonomien an (z.B. SNOMED CT), '
      + 'sodass der Phänotyp auf die Standards gemappt ist und mit anderen IT-Systemen verbunden werden kann. '
      + 'Auf diese Weise können zum einen Daten aus anderen Quellen eingelesen und zur Phänotypisierung verwendet werden. '
      + 'Auf der anderen Seite können Ergebnisse an externe IT-Systeme zurückgespielt werden.',
    formulaHelp: 'Hier können mathematische Formeln eingegeben werden, mit denen die Werte des Phänotypes berechnet werden. '
      + 'Formeln können sowohl andere Phänotypen als auch Konstanten enthalten.',
    restrictionHelp: 'Spezifizieren Sie die Einschränkungen, die auf Werte des Phänotyps angewendet werden sollen. Wählen Sie dafür bitte zunächst einen passenden Quantor aus. '
      + 'Anschließend müssen Sie für den Typ der Restriktion zwischen Wertebereich (mit Minimum und/oder Maximum) oder Aufzählung (beliebige Anzahl von vordefinierten Werten) wählen. '
      + 'Für die Quantoren "Werte vorhanden" und "Keine Werte vorhanden" kann kein Restriktionstyp gewählt werden, da die Beschränkung der Werte implizit ist.',
    expressionHelp: 'Um Restriktionen für kombinierte Phänotypen zu definieren. Muss ein Boolescher Ausdruck angegeben werden. '
      + 'In dem Ausdrück können Vereinigungen (ODER), Schnittmengen (UND) und Komplemente (NICHT) von Phänotypen enthalten sein. '
      + 'Klicken Sie auf die Plus-Schaltfläche um Komponenten zum Ausdruck hinzuzufügen. '
      + 'Außerdem können Sie auf bereits hinzugefügte Komponenten klicken, um diese zu verändern oder zu entfernen.'
  },
  entityTree: {
    listDescription: 'Wechseln Sie zwischen der Baumansicht mit Kategorien und der Listenansicht ohne Kategorien.',
    noNodesLabel: 'Es sind keine Entitäten vorhanden.',
    noResultsLabel: 'Die Filterung liefert keine Ergebnisse.'
  },
  entitySearchInput: {
    description: 'Geben Sie mindestens {minLength} Zeichen ein um nach passenden {types} zu suchen.',
    emptyResult: 'Es wurden keine passenden {types} gefunden.'
  },
  ucumCard: {
    help: 'Geben Sie eine Einheit oder eine Einheitenbezeichnung ein. Es wird Ihnen anschließend eine Liste mit Vorschlägen angezeigt, aus der Sie die passende UCUM Einheit auswählen können.'
  },
  quantorType: {
    none: 'Keine Werte vorhanden',
    exists: 'Werte vorhanden',
    some: 'Mindestens ein Wert in Bereich',
    all: 'Alle Werte in Bereich',
  }
};
