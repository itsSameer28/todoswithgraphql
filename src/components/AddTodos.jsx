import React, { useEffect, useState } from 'react';
import Tick from './Images/Ellipse.svg';
import Ellipse from './Images/Ellipse 1.svg';
import ArrowLeft from './Images/Arrow.svg';
import ArrowRight from './Images/RightArrow.svg';
import Cross from './Images/Cross.svg';
import RedCross from './Images/RedCross .svg';
const AddTodos = ({
  data,
  content,
  setContent,
  handleCreateTodo,
  handleDeleteTodo,
  handleUpdateTodo
}) => {
  const [hoveredButton, setHoveredButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [optionsId, setOptionsId] = useState(-1);
  const [removeId, setRemoveId] = useState(-1);
  const [editTodo, setEditTodo] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesOnPerPage] = useState(4);
  const [searchTodos, setSearchTodos] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [hoveredCrossButton, setHoveredCrossButton] = useState(false);

  useEffect(() => {
    if (data && data.userTodos) {
      const sortedTodos = [...data.userTodos].reverse();
      setFilteredTodos(sortedTodos);
    }
  }, [data, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  //Search Todo
  const handleSearch = () => {
    const query = searchTodos.trim().toLowerCase();
    if (query === '') {
      setFilteredTodos(data.userTodos);
    } else {
      const filtered = data.userTodos.filter((todo) => todo.content.toLowerCase().includes(query));
      setFilteredTodos(filtered);
    }
  };

  //Pagination
  const indexOfLastItem = currentPage * notesOnPerPage;
  const indexOfFirstItem = indexOfLastItem - notesOnPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredTodos.length || 0) / notesOnPerPage);

  const getPageRange = () => {
    const pageRange = [];
    const maxPageRange = Math.min(totalPages, 5);
    let startPage = currentPage - Math.floor(maxPageRange / 2);
    let endPage = currentPage + Math.floor(maxPageRange / 2);

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let page = startPage; page <= endPage; page++) {
      pageRange.push(page);
    }

    return pageRange;
  };

  return (
    <div className="w-full mx-auto p-8 rounded-2xl max-w-3xl">
      <h2 className="text-stone-950 text-[16px] font-bold mb-3 text-left">My Todos</h2>
      <div className="mb-2 relative">
        <input
          type="text"
          className="w-full h-[47px] px-10 py-3.5 bg-zinc-100 rounded-2xl shadow focus:outline-rose-600 foucs:border-0"
          placeholder="Create a todo..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <img className="absolute top-[16px] left-4 " src={Ellipse} />
      </div>
      <div className="flex  md:flex-row md:items-center">
        <input
          type="text"
          className="w-full h-[47px] px-4 py-3.5  md:mb-0 bg-zinc-100 rounded-2xl shadow me-2 focus:outline-rose-600 foucs:border-0 relative"
          placeholder="Search todos"
          value={searchTodos}
          onChange={(e) => setSearchTodos(e.target.value)}
        />
        <img
          src={!hoveredCrossButton ? Cross : RedCross}
          className={
            'px-2 py-1 rounded w-8 h-8 mt-4 cursor-pointer relative left-[-43px] top-[-6px] hover:color-rose-600'
          }
          alt="Cross Button"
          onClick={() => setSearchTodos('')}
          onMouseEnter={() => {
            setHoveredCrossButton(true);
          }}
          onMouseLeave={() => {
            setHoveredCrossButton(false);
          }}
        />
        <div className="flex justify-end md:flex-grow">
          <button
            type="submit"
            className="h-[47px] px-4 py-3.2 bg-zinc-100 rounded-2xl shadow text-[16px] text-stone-950 me-2"
            onClick={handleSearch}
          >
            Search
          </button>
          {!editTodo ? (
            <button
              type="submit"
              className="h-[47px] px-4 py-3.2 bg-pink-600 rounded-2xl shadow text-[16px] text-zinc-100 hover:bg-rose-600"
              onClick={() => handleCreateTodo(content)}
            >
              Create
            </button>
          ) : (
            <button
              type="submit"
              className="h-[47px] px-4 py-3.2 bg-pink-600 rounded-2xl shadow text-[16px] text-zinc-100 hover:bg-rose-600"
              onClick={() => {
                handleUpdateTodo(updateId, `${content}`, 'DONE');
                setEditTodo(false);
                setContent('');
              }}
            >
              Update
            </button>
          )}
        </div>
      </div>
      <div className="mt-3 p-4 bg-zinc-100 rounded-2xl">
        {(data && data.userTodos.length === 0) ||
          (data === undefined && (
            <div className="text-center text-neutral-500 text-lg font-normal">
              You have no todo now.
              <br />
              Did you just get everything done?
            </div>
          ))}

        {data && data.userTodos && (
          <div>
            <ul>
              {currentTodos.map((todo) => (
                <li key={todo.id}>
                  <div className="w-full h-8 justify-start items-center gap-2 inline-flex mt-4 ">
                    {removeId !== todo.id ? (
                      <img className="" src={Ellipse} />
                    ) : (
                      <div className="w-4 h-4 relative">
                        <img className="w-[16px] h-4 left-0 top-0 absolute" src={Tick} alt="Tick" />
                      </div>
                    )}

                    {removeId !== todo.id && (
                      <div className="w-[500px] grow shrink text-stone-950 text-[16px] font-normal text-left break-all">
                        {todo.content}
                      </div>
                    )}
                    {hoveredButton && removeId === todo.id && (
                      <div className="grow shrink SetupADevEnvironment w-[199px] text-stone-300 text-[16px] font-normal line-through">
                        {todo.content}
                      </div>
                    )}
                    {optionsId !== todo.id && (
                      <div
                        className="text-neutral-500 text-[16px] font-normal cursor-pointer"
                        onClick={() => {
                          setOptionsId(todo.id);
                          setShowOptions(true);
                        }}
                      >
                        Done
                      </div>
                    )}
                    {showOptions && optionsId === todo.id && (
                      <>
                        <div
                          className="text-neutral-500 text-[16px] font-normal hover:text-rose-600 cursor-pointer "
                          onClick={() => {
                            setContent(todo.content);
                            setEditTodo(true);
                            setUpdateId(todo.id);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="text-neutral-500 text-[16px] font-normal hover:text-rose-600 cursor-pointer "
                          onClick={() => {
                            handleDeleteTodo(todo.id);
                          }}
                          onMouseEnter={() => {
                            setRemoveId(todo.id);
                            setHoveredButton(true);
                          }}
                          onMouseLeave={() => {
                            setRemoveId(-1);
                            setHoveredButton(false);
                          }}
                        >
                          Remove
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="w-full flex justify-center mt-4 cursor-pointer ">
          <img
            src={ArrowLeft}
            className={`px-2 py-1 rounded w-8 h-8 ${
              currentPage === 1 ? 'opacity-50' : 'hover:bg-zinc-300'
            }`}
            alt="Previous Page"
            onClick={() => {
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
          />

          {getPageRange().map((pageNumber) => (
            <div
              key={pageNumber}
              className={`px-2 py-1 rounded w-8 h-8 ${
                pageNumber === currentPage
                  ? 'hover:bg-zinc-300 text-rose-600 text-[16px] font-normal'
                  : ''
              } mr-2`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          ))}

          <img
            src={ArrowRight}
            className={`px-2 py-1 rounded w-8 h-8 ${
              currentPage === totalPages ? 'opacity-50' : 'hover:bg-zinc-300 color-rose-600 '
            }`}
            alt="Next Page"
            onClick={() => {
              if (currentPage !== totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTodos;
