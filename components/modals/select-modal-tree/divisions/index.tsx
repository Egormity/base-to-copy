import { ReactComponent as BackIcon } from '@assets/icons/arrrow-back-icon.svg';
import { ReactComponent as SearchIcon } from '@assets/icons/search-icon.svg';
import { FC, useState } from 'react';

import { CompanyStructuresTreeView } from '@/components/ui/common/tree-view/CompanyStructureTreeView';

export type TreeNode = {
  itemId: string;
  label: string;
  children?: TreeNode[];
};

interface ISelectModal {
  title: string;
  data?: TreeNode[];
  type?: 'radio' | 'checkbox';
  valuesChecked?: { id: string; label: string } | { id: string; label: string }[];
  onCreate?: () => void;
  setIsModalOpen?: (value: boolean) => void;
  onSelect?: (value: { id: string; label: string } | { id: string; label: string }[]) => void;
}

const SelectModalDivisionTree: FC<ISelectModal> = ({
  title,
  onCreate,
  onSelect = () => {},
  setIsModalOpen = () => {},
}) => {
  const [selectedValue, setSelectedValue] = useState<
    | {
        id: string;
        label: string;
      }
    | undefined
  >({
    //@ts-ignore
    id: undefined,
    //@ts-ignore
    label: undefined,
  });

  return (
    <div>
      <div className='flex flex-row items-center gap-1 float-start mb-8'>
        <BackIcon onClick={() => setIsModalOpen(false)} className='cursor-pointer' />
        <div className='text-xl'>{title}</div>
      </div>
      <div>
        <div className='flex flex-row w-[350px] bg-[#F6F6F6] px-2 mb-4 max-h-[34px] rounded-lg text-sm'>
          <input className='w-full flex-1 outline-none bg-transparent' placeholder='Поиск' />
          <SearchIcon className='w-[18px] ml-2' />
        </div>
        <div className='flex overflow-auto scrollbar-thin max-h-[260px]'></div>
      </div>
      <div className='max-h-[240px] overflow-y-auto scrollbar-thin'>
        <CompanyStructuresTreeView setNode={setSelectedValue} />
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
          disabled={!selectedValue}
          className='w-full bg-color-active py-3 rounded-3xl text-white font-bold text-sm mt-8 disabled:bg-opacity-button-disabled'
          onClick={() => {
            if (selectedValue) {
              onSelect(selectedValue);
            }
            setIsModalOpen(false);
          }}
        >
          Выбрать
        </button>
      </div>
    </div>
  );
};

export default SelectModalDivisionTree;
