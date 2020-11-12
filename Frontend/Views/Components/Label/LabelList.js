import React, { useState } from 'react';
import axios from 'axios';
import LabelForm from './LabelForm';

const LabelList = ({ labels, setLabels, setIsFormVisible }) => {
  const onClickDelete = async (id) => {
    const LABEL_URL = `${process.env.API_URL}/${process.env.API_VERSION}/labels`;
    try {
      await axios.delete(`${LABEL_URL}/${id}`, { withCredentials: true });
      setLabels(labels.filter((label) => label.id !== id));
    } catch (err) {
      console.log('error');
    }
  };

  const LabelItem = ({ label }) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
      <>
        <div>
          <span color={label.color}>{label.name}</span>
          <span>{label.description}</span>
          <button type="button" onClick={() => setIsEdit(!isEdit)}>
            Edit
          </button>
          <button type="button" onClick={() => onClickDelete(label.id)}>
            Delete
          </button>
          {isEdit && (
            <LabelForm
              isEdit
              labels={labels}
              labelToEdit={label}
              setLabels={setLabels}
              setIsFormVisible={setIsFormVisible}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div>{`${labels.length} labels`}</div>
      {labels.map((label) => (
        <>
          <LabelItem key={label.id} label={label} />
        </>
      ))}
    </>
  );
};

export default LabelList;