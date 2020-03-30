import { Model } from 'objection';

interface DiagnosisIncluding {
  diagnosisId: number;
  includingId: number;
}

class DiagnosisIncluding extends Model {
  static tableName = 'diagnosesIncluding';
  static idColumn = ['diagnosisId', 'includingId'];
}

export default DiagnosisIncluding;
