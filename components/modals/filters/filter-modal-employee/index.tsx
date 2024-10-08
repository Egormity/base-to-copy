import { ReactComponent as CrossIcon } from '@assets/icons/cross.svg';
import { useModalStore } from '@store/modalStore';
import cn from 'classnames';
import { FC, useState } from 'react';

import { useFilterEmployStore } from '@/store/filters/employFilterStore';

import { useGetEmployeePost } from '@/api/commons';
import {
  useGetDictionariesDivisions,
  useGetDictionariesRoles,
  useGetDictionariesTerritories,
} from '@/api/dictionaries';

import FilterModalItem from '../filter-modal-organization/FilterModalItem';

import styles from '../FilterModal.module.scss';
import { IFilterModal } from './filter.interface';

const FilterModal: FC<IFilterModal> = () => {
  const { modals, toggleModal } = useModalStore();

  const isOpen = modals['filter-employee']?.isOpen;
  const toggleSidebar = () => toggleModal('filter-employee');

  const [searchDivision, setSearchDivision] = useState('');
  const [searchTerritories, setSearchTerritories] = useState('');
  const [searchPosts, setSearchPosts] = useState('');
  const [searchRoles, setSearchRoles] = useState('');

  const { items: divisions, isLoading: isLoadingDivisions } = useGetDictionariesDivisions(searchDivision);
  const { items: territories, isLoading: isLoadingTerritories } =
    useGetDictionariesTerritories(searchTerritories);
  const { items: posts, isLoading: isLoadingPosts } = useGetEmployeePost(searchPosts);
  const { items: roles, isLoading: isLoadingRoles } = useGetDictionariesRoles(searchRoles);

  const { applyFilters, clearFilters, filters, addFilter, removeFilter } = useFilterEmployStore();

  const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    applyFilters();
    toggleSidebar();
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    clearFilters();
  };

  return (
    <>
      <div
        className={cn(styles['filter-wrapper'], {
          'w-[390px]': isOpen,
          'w-0': !isOpen,
        })}
      >
        {isOpen && (
          <>
            <div className={styles['filter-header']}>
              <h1>Фильтр</h1>
              <CrossIcon onClick={toggleSidebar} />
            </div>
            <form>
              <div className='overflow-auto max-h-[calc(100vh-204px)] no-scrollbar'>
                <FilterModalItem
                  type='list'
                  typeValue='id'
                  filters={filters}
                  value={searchDivision}
                  addFilter={addFilter}
                  label='Подразделения'
                  name='Divisions'
                  onChange={setSearchDivision}
                  isLoading={isLoadingDivisions}
                  removeFilter={removeFilter}
                  data={divisions}
                />
                <FilterModalItem
                  type='list'
                  typeValue='id'
                  filters={filters}
                  value={searchTerritories}
                  addFilter={addFilter}
                  label='Территория'
                  name='Territories'
                  onChange={setSearchTerritories}
                  isLoading={isLoadingTerritories}
                  removeFilter={removeFilter}
                  data={territories}
                />
                <FilterModalItem
                  type='list'
                  typeValue='id'
                  filters={filters}
                  value={searchPosts}
                  addFilter={addFilter}
                  label='Должность'
                  name='Posts'
                  onChange={setSearchPosts}
                  isLoading={isLoadingPosts}
                  removeFilter={removeFilter}
                  data={posts}
                />
                <FilterModalItem
                  label='Роль'
                  name='roles'
                  type='list'
                  typeValue='id'
                  filters={filters}
                  value={searchRoles}
                  addFilter={addFilter}
                  onChange={setSearchRoles}
                  isLoading={isLoadingRoles}
                  removeFilter={removeFilter}
                  //@ts-ignore
                  data={roles}
                />
                <FilterModalItem
                  name='ShowNotActive'
                  type='select'
                  filters={filters}
                  addFilter={addFilter}
                  label='Показать неработающих'
                  removeFilter={removeFilter}
                  value={''}
                  data={[]}
                  onChange={() => {}}
                />
              </div>
              <div className={styles['wrapper-buttons']}>
                <button className={styles['button-apply']} onClick={handleApply} children={'Применить'} />

                <button className={styles['button-cancel']} onClick={handleClear} children={'Сбросить'} />
              </div>
            </form>
          </>
        )}
      </div>
      {isOpen && <div className={styles['bg-inset']} onClick={toggleSidebar} />}
    </>
  );
};

export default FilterModal;
