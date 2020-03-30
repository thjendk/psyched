import { Model } from 'objection';

interface DiagnosisExcluding {
  diagnosisId: number;
  excludingId: number;
}

class DiagnosisExcluding extends Model {
  static tableName = 'diagnosesExcluding';
  static idColumn = ['diagnosisId', 'excludingId'];
}

export default DiagnosisExcluding;
