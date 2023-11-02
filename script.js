//Define UI input
let form= document.querySelector('.task_form');
let new_task= document.querySelector('.input_task');
let submit =document.querySelector('.submit_btn');
let filter = document.querySelector('#Filter_task');
let list = document.querySelector('.task_list');
let clearTask = document.querySelector('#Clear_task');

//Define event listner

form.addEventListener('submit',AddTask);
list.addEventListener('click',RemoveTask);
clearTask.addEventListener('click',ClearAll);
filter.addEventListener('keyup',FilterTask);
document.addEventListener('DOMContentLoaded',getTask);

//Define function
function AddTask(e)
{
    e.preventDefault();
    if(new_task.value=== '')
    {
        alert('Add a Task!');
    }
    else
    {
        let li= document.createElement('li');
        li.appendChild(document.createTextNode(new_task.value + ' ' ));

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
        list.appendChild(li);
        storeTaskInLocalStorage(new_task.value);
        new_task.value='';
    }

    
}

//Remove Task
function RemoveTask(e)
{
    if(e.target.hasAttribute("href")){
        if(confirm("Are you sure?")){
        let ele= e.target.parentElement;
        ele.remove();
        removeFromLS(ele);
        }
    }
}

// Clear
function ClearAll(e)
{
   // list.innerHTML = '';
   while(list.firstChild){
    list.removeChild(list.firstChild);
   }

    localStorage.clear();
}

//Filter Task
function FilterTask(e)
{
    let text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('li').forEach(task=>
        {
            let item= task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1)
            {
                task.style.display='block';
            }
            else{
                task.style.display='none';

            }
        }
        );

}

// Store in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else
    {
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTask(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else
    {
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task=>
        {
            let li= document.createElement('li');
            li.appendChild(document.createTextNode(task + ' ' ));
    
            let link = document.createElement('a');
            link.setAttribute('href','#');
            link.innerHTML='x';
            li.appendChild(link);
            list.appendChild(li);
        });

}
function removeFromLS(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else
    {
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    let li=taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task,index)=>
    {
        if(li.textContent.trim()===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));

}