import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import { Popup, Modal, Icon, Button } from 'semantic-ui-react';
import { Tag } from './DiagnosisTableRow';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Diagnosis from 'classes/Diagnosis.class';
import SymptomTagPoints from './SymptomTagPoints';
import { DiagnosisSymptom } from 'types/generated';

export interface SymptomTagProps {
  symptom?: Symptom;
  diagnosisSymptom?: DiagnosisSymptom;
  diagnosis: Diagnosis;
  style?: any;
  excess?: boolean;
}

const SymptomTag: React.SFC<SymptomTagProps> = ({
  symptom,
  diagnosis,
  style,
  diagnosisSymptom,
  excess
}) => {
  const s = symptom || diagnosisSymptom.symptom;
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const [modalOpen, setModalOpen] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const isNotParent = diagnosis.symptoms.map((s) => s.symptom.id).includes(s.id);

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  const handleRemoveSymptom = async (id: number) => {
    setRemoveLoading(true);
    await Diagnosis.removeSymptom(diagnosis.id, id);
    setModalOpen(false);
    setRemoveLoading(false);
  };

  if (excess && diagnosisSymptom?.point < 0)
    return (
      <SymptomTag
        diagnosis={diagnosis}
        diagnosisSymptom={diagnosisSymptom}
        style={{
          backgroundColor: 'red',
          color: 'white'
        }}
      />
    );
  if (excess)
    return (
      <SymptomTag
        diagnosis={diagnosis}
        symptom={s}
        style={{
          backgroundColor: '#870000',
          color: 'white'
        }}
      />
    );
  if (diagnosisSymptom?.point < 0) return null;
  return (
    <Popup
      key={s.id}
      position="top center"
      disabled={!s.description}
      trigger={
        <Tag style={style} active={symptomIds.includes(s.id)} notParent={isNotParent}>
          <span onClick={() => handlePick(s.id)}>{s.name.toTitleCase()}</span>
          {user && isNotParent && (
            <Modal
              open={modalOpen}
              trigger={
                <Icon
                  style={{ marginLeft: '4px' }}
                  color="grey"
                  onClick={() => setModalOpen(true)}
                  name="close"
                />
              }
            >
              <Modal.Header>
                Vil du fjerne {s.name} fra {diagnosis.name}?
              </Modal.Header>
              <Modal.Actions>
                <Button basic color="black" onClick={() => setModalOpen(false)}>
                  <Icon name="close" /> Nej
                </Button>
                <Button
                  basic
                  color="red"
                  loading={removeLoading}
                  disabled={removeLoading}
                  onClick={() => handleRemoveSymptom(s.id)}
                >
                  <Icon name="trash" /> Ja
                </Button>
              </Modal.Actions>
            </Modal>
          )}
          <SymptomTagPoints
            diagnosis={diagnosis}
            symptom={diagnosisSymptom}
            isNotParent={isNotParent}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-apart',
              flexWrap: 'wrap',
              alignItems: 'flex-start'
            }}
          >
            {s.children.map((s) => {
              const chosenChild = diagnosis.symptoms.find((symp) => symp.symptom.id === s.id);
              if (!!chosenChild)
                return <SymptomTag diagnosisSymptom={chosenChild} diagnosis={diagnosis} />;
              if (isNotParent) {
                const symptom = symptoms.find((symp) => symp.id === s.id);
                return <SymptomTag symptom={symptom} diagnosis={diagnosis} />;
              }
              if (!chosenChild || chosenChild.point < 0) return null;
              return null;
            })}
          </div>
        </Tag>
      }
    >
      {s.description}
    </Popup>
  );
};

export default SymptomTag;
