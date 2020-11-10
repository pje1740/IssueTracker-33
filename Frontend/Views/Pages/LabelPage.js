import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LabelList from '../Components/LabelList';
import LabelForm from '../Components/LabelForm';

const LabelPage = () => {
  const [labels, setLabels] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(async () => {
    const { data } = await axios.get('http://localhost:3000/api/v1/labels', { withCredentials: true });
    setLabels(data);
  }, []);

  const onToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <div>
        <Link to="/labels">
          <button type="button">Lables</button>
        </Link>
        <Link to="/milestones">
          <button type="button">Milestones</button>
        </Link>
        <button type="button" onClick={onToggleForm}>
          New Label
        </button>
      </div>
      {isFormVisible && <LabelForm setIsFormVisible={setIsFormVisible} labels={labels} setLabels={setLabels} />}
      <LabelList labels={labels} setLabels={setLabels} setIsFormVisible={setIsFormVisible} />
    </>
  );
};

export default LabelPage;