import { ReactComponent as ArrowVertical } from '@assets/icons/arrow-vertical-icon.svg';
import { useRouter } from '@tanstack/react-router';
import cn from 'classnames';
import { type FC, useState } from 'react';

import type { Filter } from '@/store/filters/organizationFilterStore';

import LibraryFoldersTree from '../../pages/library/LibraryFoldersTree';
import { MATERIALS_FOLDER_TYPE_ID, POLLS_FOLDER_TYPE_ID } from '../../pages/library/library-types';
import styles from '../filters/filter-modal-organization/FilterModalItem/FilterModalItem.module.scss';

interface IItemFilterModal {
  label: string;
  name: string;
  filters: Array<Filter>;
  addFilter: (name: string, value: number | string) => void;
  removeFilter: (name: string, value: number | string) => void;
}

const FilterModalLibrarySearchItemTree: FC<IItemFilterModal> = ({
  label,
  name,
  filters,
  addFilter,
  removeFilter,
}) => {
  const selectedFilter = filters.find(filter => filter.name === name);
  const [isOpen, setIsOpen] = useState(!!selectedFilter || false);

  // FROM
  const router = useRouter();
  const from = router.latestLocation.pathname.split('/')[3] as 'materials' | 'polls';

  // FOLDER TYPE ID
  let folderTypeId;
  if (from === 'materials') folderTypeId = MATERIALS_FOLDER_TYPE_ID;
  if (from === 'polls') folderTypeId = POLLS_FOLDER_TYPE_ID;

  // console.log(selectedFilter);

  const handlerVisible = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <li className={styles['wrapper-item']}>
      <label className={styles['container-item']} onClick={handlerVisible}>
        <span>{label}</span>
        <ArrowVertical
          className={cn({
            'rotate-180': isOpen,
          })}
        />
      </label>

      {isOpen && (
        <LibraryFoldersTree
          folderTypeId={folderTypeId || 0}
          className='border border-stone-200 rounded-xl'
          checkboxSelection
          multiSelect
          handleCheckedItem={(id, isSelected) => {
            // console.log(id, isSelected);
            if (isSelected) addFilter(name, id);
            else removeFilter(name, id);
          }}
          defaultCheckedItems={(selectedFilter?.values as Array<string>) || []}
        />
      )}
    </li>
  );
};

export default FilterModalLibrarySearchItemTree;
