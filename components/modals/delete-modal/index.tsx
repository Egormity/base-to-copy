import type { FC } from 'react';

interface IDeleteModalForm {
  deleteTitle: string;
  onDelete: (evt: any) => void;
  onCancel: (evt: any) => void;
}

const DeleteModalForm: FC<IDeleteModalForm> = ({ deleteTitle, onCancel, onDelete }) => {
  return (
    <>
      <div className='mb-4'>
        <h1 className='text-xl mb-1'>Удаление</h1>
        <p className='text-xs font-light text-[#727272]'>
          Вы уверены что хотите удалить <span className='block'>{deleteTitle}?</span>
        </p>
      </div>
      <div className='flex flex-row justify-center items-center gap-2'>
        <button
          className='bg-[#4A4A4A] bg-opacity-button-disabled rounded-[18px] text-[#4A4A4A] font-bold text-sm py-2 px-[14px]'
          onClick={onCancel}
        >
          Отмена
        </button>
        <button
          className='bg-primary-red bg-opacity-button-disabled rounded-[18px] text-primary-red font-bold text-sm py-2 px-[14px]'
          onClick={onDelete}
        >
          Удалить
        </button>
      </div>
    </>
  );
};

export default DeleteModalForm;
