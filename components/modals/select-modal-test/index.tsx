import { ReactComponent as BackIcon } from '@assets/icons/arrrow-back-icon.svg';
import { ReactComponent as SearchIcon } from '@assets/icons/search-icon.svg';
import { FC, useEffect, useState } from 'react';

import GIF from '@/assets/gif/loader/loader.gif';

import { RadioButton } from '../../inputs';
import { Checkbox } from '../../inputs/Checkbox';
import { RadioGroup } from '../../inputs/RadioButton/RadioGroup';

interface IDataItem {
  id: number | string;
  name: string;
  address?: string;
}

interface ISelectModal {
  id?: string | number;
  title: string;
  data?: IDataItem[];
  type?: 'radio' | 'checkbox';
  isLoading: boolean;
  valuesChecked?: IDataItem | IDataItem[];
  onCreate?: () => void;
  inputHandler?: (value: string) => void;
  setIsModalOpen?: (value: boolean) => void;
  onSelect?: (value: IDataItem | IDataItem[]) => void;
  onSearch?: React.Dispatch<React.SetStateAction<string>>;
}

const SelectModalTest: FC<ISelectModal> = ({
  title,
  data = [],
  onCreate,
  isLoading,
  valuesChecked,
  type = 'radio',
  onSelect = () => {},
  setIsModalOpen = () => {},
  inputHandler = () => {},
  onSearch,
}) => {
  const [selectedValue, setSelectedValue] = useState<IDataItem | null>(
    (type === 'radio' && valuesChecked ? (valuesChecked as IDataItem) : null) || null
  );
  const [selectedValues, setSelectedValues] = useState<IDataItem[]>(
    (type === 'checkbox' && Array.isArray(valuesChecked) ? valuesChecked : []) || []
  );

  const handleRadioChange = (value: IDataItem) => {
    setSelectedValue(value);
  };

  const handleCheckboxChange = (item: IDataItem) => {
    setSelectedValues(prevValues =>
      prevValues.some(val => val.id === item.id)
        ? prevValues.filter(val => val.id !== item.id)
        : [...prevValues, item]
    );
  };

  useEffect(() => {
    inputHandler('');
    onSearch && onSearch('');
  }, [setIsModalOpen]);

  return (
    <div>
      <div className='flex flex-row items-center gap-1 float-start mb-8'>
        <BackIcon onClick={() => setIsModalOpen(false)} className='cursor-pointer' />
        <div className='text-xl'>{title}</div>
      </div>
      <div>
        <div className='flex flex-row w-[350px] bg-[#F6F6F6] px-2 mb-4 max-h-[34px] rounded-lg text-sm'>
          <input
            onChange={e => {
              inputHandler(e.target.value);
              onSearch && onSearch(e.target.value);
            }}
            className='w-full flex-1 outline-none bg-transparent'
            placeholder='Поиск'
          />
          <SearchIcon className='w-[18px] ml-2' />
        </div>
        {isLoading ? (
          <div className='w-full flex items-center h-[260px]'>
            <img src={GIF} className='m-auto' />
          </div>
        ) : (
          <div className='flex overflow-auto scrollbar-thin h-[260px]'>
            {type === 'radio' ? (
              <RadioGroup
                name='example'
                selectedValue={selectedValue}
                onChange={handleRadioChange}
                className='space-y-4'
              >
                {data.map(item => (
                  //@ts-ignore
                  <RadioButton
                    key={item.id}
                    //@ts-ignore
                    value={item}
                    label={item.name}
                    subtitle={item?.address}
                  />
                ))}
              </RadioGroup>
            ) : (
              <div className='space-y-4 max-w-[350px] text-left'>
                {data?.map(item => {
                  return (
                    <label key={item.id} className='flex items-center space-x-3 cursor-pointer'>
                      <Checkbox
                        value={selectedValues.some(value => value?.id === item?.id)}
                        onChange={() => handleCheckboxChange(item)}
                      />

                      <span>{item?.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className='flex flex-row gap-2'>
        {onCreate && (
          <button
            type='button'
            className='w-full bg-color-active py-3 rounded-3xl text-white font-bold text-sm mt-8'
            onClick={onCreate}
          >
            Создать
          </button>
        )}
        <button
          type='button'
          disabled={type === 'radio' ? !selectedValue : selectedValues.length === 0}
          className='w-full bg-color-active py-3 rounded-3xl text-white font-bold text-sm mt-8 disabled:bg-opacity-button-disabled'
          onClick={() => {
            onSelect(type === 'radio' ? selectedValue! : selectedValues);
            setIsModalOpen(false);
          }}
        >
          Выбрать
        </button>
      </div>
    </div>
  );
};

export default SelectModalTest;
