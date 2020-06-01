import { Model } from 'objection';

interface DiagnosisParent {
  diagnosisId: number;
  parentId: number;
}

class DiagnosisParent extends Model {
  static tableName = 'diagnosisParents';
  static idColumn = ['diagnosisId', 'parentId'];
}

export default DiagnosisParent;
