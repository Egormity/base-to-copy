// import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { inputStyle } from '../utils/classNames';

type InputUseFormProps = {
  type?: 'input' | 'textarea';
  inputName: string;
  placeHolder: string;
  errors: object;
  registerOptions: object;
  registerFunc: unknown;
  inputType: string;
  label?: string;
  defaultValue?: string;
};

export default function InputUseForm({
  type = 'input',
  inputName,
  placeHolder,
  errors,
  registerOptions,
  registerFunc,
  inputType,
  label,
  defaultValue,
}: InputUseFormProps) {
  // @ts-expect-error - REACT HOOK FORM TYPES GIVE ERRORS IN VS CODE
  const message = errors[inputName]?.message;

  if (type === 'input')
    return (
      <div className='flex items-center gap-8'>
        {label && (
          <label htmlFor={inputName} className='w-28'>
            {label}
          </label>
        )}

        <div className='relative w-full'>
          {message && <span className='form-required'>{message}</span>}
          <input
            defaultValue={defaultValue}
            className={`${inputStyle} w-full`}
            placeholder={placeHolder}
            type={inputType}
            id={inputName}
            // @ts-expect-error - REACT HOOK FORM TYPES GIVE ERRORS IN VS CODE
            {...registerFunc(inputName, registerOptions)}
          />
        </div>
      </div>
    );

  if (type === 'textarea')
    return (
      <div className='flex items-center gap-8'>
        {label && (
          <label htmlFor={inputName} className='w-28'>
            {label}
          </label>
        )}

        <div className='relative w-full'>
          {message && <span className='form-required'>{message}</span>}
          <textarea
            defaultValue={defaultValue}
            className={`${inputStyle} w-full`}
            placeholder={placeHolder}
            id={inputName}
            // @ts-expect-error - REACT HOOK FORM TYPES GIVE ERRORS IN VS CODE
            {...registerFunc(inputName, registerOptions)}
          />
        </div>
      </div>
    );

  return <h1 className='text-3xl font-bold'>You specified the wrong type</h1>;
}
