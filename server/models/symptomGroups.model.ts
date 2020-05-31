import { Model } from 'objection';

interface SymptomGroup {
  symptomId: number;
  groupId: number;
}

class SymptomGroup extends Model {
  static tableName = 'symptomGroups';
  static idColumn = ['symptomId', 'groupId'];
}

export default SymptomGroup;
