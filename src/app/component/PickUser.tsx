import { Dropdown } from './Dropdown';
import { Option, options } from './data';

const PickUser = () => {
  const handleOptionSelect = (options: Option[]) => {
    console.log(options);
  };
  return (
    <div style={{ margin: '30px' }}>
      <h1>Pick Users</h1>
      <Dropdown options={options} onChangeValue={handleOptionSelect} />
    </div>
  );
};

export default PickUser;
