import React, { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import DiagnosisGroup from './DiagnosisGroup';
import Group from 'classes/Group.class';
export const GroupContext = React.createContext<Group>(null);

export interface DiagnosisSymptomTagsProps {}

const DiagnosisSymptomTags: React.SFC<DiagnosisSymptomTagsProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const groups = useSelector((state: ReduxState) => state.groups.groups);

  return (
    <div>
      {diagnosis.parents
        .map((p) => diagnoses.find((d) => d.id === p.id))
        .map((p) => (
          <>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                Generelle kriterier for {p.icdCode}: {p.name.toLowerCase()}:
              </p>
              {diagnoses
                .find((d) => p.id === d.id)
                ?.groups.filter((g) => !g.parent)
                .map((g) => (
                  <GroupContext.Provider value={g}>
                    <DiagnosisGroup />
                  </GroupContext.Provider>
                ))}
            </div>
            <hr />
          </>
        ))}
      {diagnosis.groups
        .map((g) => groups.find((group) => group.id === g.id))
        .filter((g) => !g.parent)
        .map((g) => (
          <GroupContext.Provider value={g}>
            <DiagnosisGroup />
          </GroupContext.Provider>
        ))}
    </div>
  );
};

export default DiagnosisSymptomTags;
