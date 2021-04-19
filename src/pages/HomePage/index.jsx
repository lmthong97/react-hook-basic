import React, { useEffect, useState } from 'react';
import queryString from 'query-string'; // npm i --save query-string
import './HomePage.scss';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Pagination from './components/Pagination';
import PostFiltersForm from './components/PostFiltersForm'; 
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';
import MagicBox from './components/MagicBox';

function HomePage() {


  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState ({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    
  }); 


  useEffect(() => {
   
    async function fetchPostList(){
      try {
        const paramsString = queryString.stringify(filters);
        
        //_limit=10&_page=1
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
  
        const {data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);

      } catch (error) {
        console.log('Failed to fetch post list', error.message);
      }
    }
    
    console.log('POST list effect')
    fetchPostList();

  }, [filters]);  

  useEffect(()=> {
    console.log('TODO list effect')
  });


  function handlePageChange (newPage){
    console.log('New page', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    // console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);

  }

  function handleTodoFormSubmit(formValue){
    console.log('form submit', formValue)

    const newTodo = {
      id: todoList.length + 1, 
      ...formValue,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters){
    console.log('New filters', newFilters);
    setFilters({
      ...filters, 
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="HomePage">
      <h1>React hooks - Clock </h1>

      <MagicBox />
      {/* { showClock && <Clock />} */}
      {/* < BetterClock /> */}

      {/* <button onClick = {() => setShowClock(false) } >Hide Clock</button> */}

      {/* <TodoForm onSubmit={handleTodoFormSubmit}/> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      {/* <PostFiltersForm onSubmit = {handleFiltersChange} />
      <PostList posts={postList} />

      < Pagination 
        pagination = {pagination}
        onPageChange = {handlePageChange}

      /> */}

    </div>
  );
}

export default HomePage;
