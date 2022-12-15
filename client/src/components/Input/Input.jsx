import React from 'react';

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Input = ({ name, id, type, placeholder, handleChange, value, inputType }) => {
  const titleHeader = capitalizeFirstLetter(name);

  const generateInput = (selectedInputType) => {
    switch (selectedInputType) {
      case 'select':
        return (
          <div className="mt-1 mb-10 rounded-lg">
            <select name="condition" id="condition" className="w-full border bg-gray-50 dark:bg-gray-700 border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500" required value={value} onChange={handleChange}>
              <option value="blank">Choose One</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        );
      case 'image':
        return (
          <input type="file" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Choose Image" value={value} onChange={handleChange} />
        );
      case 'textarea':
        return (
          <textarea
            name="description"
            id="description"
            rows="2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Description Here!"
            required
            value={value}
            onChange={handleChange}
          />
        );
      default:
        return (
          <input onChange={handleChange} type={type || 'text'} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required value={value} name={name} />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {titleHeader}
      </label>
      {generateInput(inputType)}
    </div>
  );
};

export default Input;
