import { Model } from 'objection';

interface Group {
  id: number;
  name: string;
  index: number;
  diagnosisId: number;
  parentId: number;
}

class Group extends Model {
  static tableName = 'groups';
}

export default Group;
