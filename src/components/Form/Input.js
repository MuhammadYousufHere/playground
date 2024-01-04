import React from 'react';
import { validate } from '../../util/misc';

const FormInputField = function (props) {
  const {
    id,
    value,
    name,
    className,
    onChange,
    onKeyUp,
    type,
    onBlur,
    options,
    form,
    maxlength,
    cols,
    rows,
    style,
    defaultValue,
    placeholder,
    isFetching,
    labelTitle,
    labelRight,
  } = props;

  if (type === 'select') {
    return (
      <div>
        <label style={{ color: form[name].error ? 'red' : 'inherit' }}>
          {form[name].error
            ? form[name].errorMessage.toUpperCase()
            : labelTitle.toUpperCase()}
        </label>
        <select
          className={className}
          name={name}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
        >
          <option
            value=''
            hidden
          >{`Select your ${labelTitle.toLowerCase()}`}</option>
          {isFetching ? <option disabled>loading...</option> : options}
        </select>
      </div>
    );
  } else if (type === 'textarea') {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label style={{ color: form[name].error ? 'red' : 'inherit' }}>
            {form[name].error
              ? form[name].errorMessage.toUpperCase()
              : labelTitle.toUpperCase()}
          </label>
          <span className='labelRight'>{labelRight}</span>
        </div>
        <textarea
          maxLength={maxlength}
          cols={cols}
          rows={rows}
          style={style}
          className={className}
          name={name}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          defaultValue={defaultValue}
        />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 15,
        }}
      >
        <label style={{ color: form[name].error ? 'red' : 'inherit' }}>
          {form[name].error
            ? form[name].errorMessage.toUpperCase()
            : labelTitle.toUpperCase()}
        </label>
        <span className='labelRight'>{labelRight}</span>
      </div>
      <input
        id={id}
        value={value}
        name={name}
        onBlur={
          /*Added this (was formerly `handleBlur`) so that handleBlur can come from the parent component (src\components\CreateCampaign\CreateCampaignForm.js)props.validate || handleBlur*/
          (e) => {
            validate(this, form, e);
          }
        }
        className={className}
        type={type || 'text'}
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormInputField;
