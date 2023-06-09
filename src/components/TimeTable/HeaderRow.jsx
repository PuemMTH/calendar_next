const HeaderRow = ({ headers }) => (
    <div className='grid grid-cols-28'>
      {headers.map((header, headerIndex) => (
        <div
          key={`header-${headerIndex}`}
          className='border py-1 pl-1 col-span-2 dark:text-white dark:border-gray-700'
        >
          {header}
        </div>
      ))}
    </div>
  );

export default HeaderRow;