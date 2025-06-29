import { PriorityQueue } from "@datastructures-js/priority-queue";

interface ITask {
  task_name: string;
  submission_time: number;
  execution_time: number;
  priority: number;
}

interface ITaskOutput {
  task_name: string;
  start_time: number;
  end_time: number;
}

//
// DATASET
//
const data: ITask[] = [
  {
    task_name: "one",
    submission_time: 0,
    execution_time: 5,
    priority: 2,
  },
  {
    task_name: "two",
    submission_time: 1,
    execution_time: 10,
    priority: 1,
  },
  {
    task_name: "three",
    submission_time: 3,
    execution_time: 10,
    priority: 0,
  },
];

//
// EXECUTION OF CODE
//
const output = fcfs(data);
console.log(output);
//
//


function fcfs(task_list: ITask[]): ITaskOutput[] {
  // sort task by sub time (and exec time)
  task_list.sort(sortBySubTime);

  const result_list: ITaskOutput[] = [];

  let end_time = 0;

  // all tasks pushed in here will be sorted by their priority
  const available_tasks_q = new PriorityQueue(compareTask);

  while (task_list.length) {
    // we want to add the first available task regardless of submission time
    available_tasks_q.push(task_list.shift());

    // checking task_list size here again, as it might be empty from above line
    // add all tasks that are available at current end_time
    while (task_list.length && task_list[0].submission_time <= end_time) {
      available_tasks_q.push(task_list.shift());
    }

    // process all the available tasks
    while (available_tasks_q.size()) {
      const curr_task = available_tasks_q.pop();

      let start_time: number;

      if (curr_task?.submission_time > end_time) {
        start_time = curr_task?.submission_time;
      } else {
        start_time = end_time;
      }

      end_time = start_time + curr_task?.execution_time;

      const curr_task_output: ITaskOutput = {
        task_name: curr_task?.task_name,
        start_time: start_time,
        end_time: end_time,
      };
      result_list.push(curr_task_output);
    }
  }

  return result_list;
}

function sortBySubTime(taskA: ITask, taskB: ITask): number {
  // if tasks have the same sub time prioritize shorter exec task
  if (taskA.submission_time == taskB.submission_time) {
    return taskA.execution_time < taskB.execution_time ? -1 : 1;
  }
  // else sort by soonest sub time
  return taskA.submission_time < taskB.submission_time ? -1 : 1;
}

// COMPARISON FUNCTION FOR PRIORITY QUEUE
function compareTask(a: ITask, b: ITask): number {
  if (a.priority < b.priority) return -1; //prioritize lower number priorities
  return 1;
}


// We know that the OS is responsible for scheduling the user’s jobs, and we can have different types of scheduling algorithms to
//  serve different goals.Let's take a fairly simple one -- First Come First Serve (FCFS), which aims to prioritise processes that
//  were submitted earlier.

// You are given a list of jobs, the time they are submitted at, and the amount of time it takes to do them.The program should
// print the start, and end time of each job, as if the OS had scheduled them using FCFS.

// Sample Input:

// P1 submission_time=0 execution_time=5
// P2 submission_time=500 execution_time=10

// list <name, sub_t, e_t>[]
// res_list <name, start_t, end_t>[]

// sort by submission time

// end_time = 0;
// variable to keep track of end time of last task
// whenever i update this var, i will need to check if the sub time is greater than the prev end time.

// for loop list of task:
//      var start_time
//      if the sub_time > end_time:
//          start_time = sub_time
//      else:
//           start_time = end_time
//      end_time = start_time + exec_time
//      res_list.push(<task.name, start_time, end_time>)

// return res_list

// function fcfs(task_list: [name, submission_time, execution_time][]){
//     task_list.sort(sortBySubTime)

//     const result_list = []
//     let end_time = 0;

//     for (const task of task_list){
//         let start_time;
//         if(task[1] > end_time){
//             start_time = task[1]
//         }else{
//             start_time = end_time;
//         }

//         end_time = start_time + task[2]

//         result_list.push([task[0], start_time, end_time])
//     }

//     return result_list
// }

// function sortBySubTime(taskA: [String, int, int], taskB: [String, int, int]){
//     if(taskA[1] == taskB[1]) {
//         return taskA[2] > taskB[2]
//     }
//     return taskA[1] > taskB[1]
// }

//      s e  p
// job1 0 5  2
// job2 1 10 1
// job3 3 10 0
