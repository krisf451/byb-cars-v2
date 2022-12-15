import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { TiDelete } from 'react-icons/ti';
import { useConvertArrayToObject } from '../../hooks';
import { useGetCarColorsQuery, useGetCarModelsQuery, useGetCarMakesQuery } from '../../redux/services/CARS';

const ExploreSearchSelect = ({ close, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const makes = useGetCarMakesQuery();
  const models = useGetCarModelsQuery();
  const colors = useGetCarColorsQuery();
  const [makesObject, setMakesObject] = useState([]);
  const [modelsObject, setModelsObject] = useState([]);
  const [colorsObject, setColorsObject] = useState([]);

  const [carSearchParams, setCarSearchParams] = useState({});

  useEffect(() => {
    if (searchParams.get('make')) setCarSearchParams({ ...carSearchParams, make: searchParams.get('make') });
    if (searchParams.get('model')) setCarSearchParams({ ...carSearchParams, model: searchParams.get('model') });
    if (searchParams.get('color')) setCarSearchParams({ ...carSearchParams, color: searchParams.get('color') });
    if (searchParams.get('yearFrom')) setCarSearchParams({ ...carSearchParams, yearFrom: searchParams.get('yearFrom') });
    if (searchParams.get('yearTo')) setCarSearchParams({ ...carSearchParams, yearTo: searchParams.get('yearTo') });
    if (searchParams.get('price')) setCarSearchParams({ ...carSearchParams, price: searchParams.get('price') });
  }, []);

  const handleSubmitSearchParams = (e) => {
    e.preventDefault();
    setSearchParams({ ...carSearchParams });
    setCurrentPage(1);
    close();
  };

  const years = [
    { value: 2017, label: '2017' },
    { value: 2018, label: '2018' },
    { value: 2019, label: '2019' },
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
  ];

  const prices = [
    { value: 10000, label: '10,000' },
    { value: 20000, label: '20,000' },
    { value: 30000, label: '30,000' },
    { value: 40000, label: '40,000' },
    { value: 50000, label: '50,000' },
  ];

  useEffect(() => {
    if (!makes.isFetching && !models.isFetching && !colors.isFetching) {
      setMakesObject(useConvertArrayToObject(makes));
      setModelsObject(useConvertArrayToObject(models));
      setColorsObject(useConvertArrayToObject(colors));
    }
  }, [makes.isFetching, models.isFetching, colors.isFetching]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      height: 50,
      outline: 'none',
      border: '1px solid black',
    }),
    indicatorSeparator: () => null,
    input: (provided) => ({
      ...provided,
      input: {
        opacity: '1 !important',
      },
    }),
  };

  return (
    <form
      onSubmit={(e) => handleSubmitSearchParams(e)}
      className="relative pointer-events-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-start p-10 h-max w-[65%] bg-white rounded-md lg:rounded-lg"
    >
      <p className="md:col-span-2 lg:col-span-3 p-2 mb-4 text-2xl text-center font-serif">Find what you&apos;re looking for</p>
      <Select
        options={makesObject}
        placeholder="Make"
        isSearchable
        noOptionsMessage={() => 'Type to search for keyword'}
        defaultInputValue={searchParams.get('make') || ''}
        onChange={(selectedOption) => { setCarSearchParams({ ...carSearchParams, make: selectedOption.value }); }}
        styles={customStyles}
      />
      <Select
        options={modelsObject}
        placeholder="Models"
        isSearchable
        noOptionsMessage={() => 'Type to search for keyword'}
        defaultInputValue={searchParams.get('model') || ''}
        onChange={(selectedOption) => { setCarSearchParams({ ...carSearchParams, model: selectedOption.value }); }}
        styles={customStyles}
      />
      <Select
        options={colorsObject}
        placeholder="Color"
        isSearchable
        noOptionsMessage={() => 'Type to search for keyword'}
        defaultInputValue={searchParams.get('color') || ''}
        onChange={(selectedOption) => { setCarSearchParams({ ...carSearchParams, color: selectedOption.value }); }}
        styles={customStyles}
      />
      <Select
        options={years}
        placeholder="Year From"
        isSearchable
        noOptionsMessage={() => 'Type to search for keyword'}
        defaultInputValue={searchParams.get('yearFrom') || ''}
        onChange={(selectedOption) => { setCarSearchParams({ ...carSearchParams, yearFrom: selectedOption.value }); }}
        styles={customStyles}
      />
      <Select
        options={years}
        placeholder="Year To"
        isSearchable
        noOptionsMessage={() => 'Type to search for keyword'}
        defaultInputValue={searchParams.get('yearTo') || ''}
        onChange={(selectedOption) => { setCarSearchParams({ ...carSearchParams, yearTo: selectedOption.value }); }}
        styles={customStyles}
      />
      <Select
        options={prices}
        placeholder="Price"
        isSearchable
        noOptionsMessage={() => 'Type to search for keyword'}
        defaultInputValue={searchParams.get('price') || ''}
        onChange={(selectedOption) => { setCarSearchParams({ ...carSearchParams, price: selectedOption.value }); }}
        styles={customStyles}
      />
      <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-4 gap-2">
        {Object.keys(carSearchParams).length > 0 && (
          <button
            type="button"
            onClick={() => {
              setCarSearchParams({});
              setSearchParams({});
              setCurrentPage(1);
              close();
            }}
            className="flex items-center justify-center gap-1 py-1 px-3 rounded-lg bg-[#ffe6ee] text-[#ff236c] hover:bg-[#e4fcff] hover:text-[#407dd3]"
          >
            Clear Filters <TiDelete className="h-5 w-5" />
          </button>
        )}
        <button type="submit" className="flex items-center justify-center gap-1 py-1 px-3 rounded-lg bg-[#f1fafb] text-[#4993fa] hover:bg-[#e4fcff] hover:text-[#407dd3]">
          Search
        </button>
      </div>
    </form>
  );
};

export default ExploreSearchSelect;
