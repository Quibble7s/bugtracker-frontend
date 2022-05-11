import PropTypes from 'prop-types';

export const Form = ({
  className = '',
  children,
  onSubmit = (data) => {},
  onChange = ({ name, id, value }) => {},
  onInvalid = ({ name, id }) => {},
}) => {
  let data = {};

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  const onChangeHandler = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const id = e.target.id;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    data = { ...data, [id]: value };
    onChange({ name, id, value });
  };

  const onInvalidHandler = (e) => {
    const name = e.target.name;
    const id = e.target.id;
    onInvalid({ name, id });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      onChange={onChangeHandler}
      onInvalid={onInvalidHandler}
      className={className}>
      {children}
    </form>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onInvalid: PropTypes.func,
};
