import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Icon, Input, Form } from 'semantic-ui-react';
import { DiagnosisSymptom } from 'types/generated';
import Diagnosis from 'classes/Diagnosis.class';

export interface SymptomTagPointsProps {
  symptom: DiagnosisSymptom;
  diagnosis: Diagnosis;
}

const SymptomTagPoints: React.SFC<SymptomTagPointsProps> = ({ symptom, diagnosis }) => {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);
  const [point, setPoint] = useState(symptom?.point?.toString() || '');

  const handleSubmit = async () => {
    if (!point) return setEditing(false);
    const nPoint = Number(point);
    if (isNaN(nPoint)) return setEditing(false);
    await Diagnosis.updateSymptom(diagnosis.id, symptom.symptom.id, nPoint);
    setEditing(false);
  };

  useEffect(() => {
    ref.current?.focus();
  }, [editing]);

  if (!symptom) return null;
  if (editing)
    return (
      <Form as="span" onSubmit={handleSubmit}>
        <Input
          placeholder="Point"
          size="mini"
          ref={ref}
          style={{ width: '50px', height: '20px' }}
          onBlur={handleSubmit}
          value={point}
          onChange={(e) => setPoint(e.target.value)}
        />
      </Form>
    );
  if (point)
    return (
      <span style={{ marginLeft: '5px' }} onClick={() => setEditing(true)}>
        {point}
      </span>
    );
  if (!point && user)
    return (
      <Icon
        onClick={() => {
          if (!user) return;
          setEditing(true);
        }}
        name="wrench"
        color="grey"
      />
    );
  return null;
};

export default SymptomTagPoints;
