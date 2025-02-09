import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";

const Homepage = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]); //where we store a users todos
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });
    setTodo("");
  };

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });
    setTodo("");
    setIsEdit(false);
  };

  const navigate = useNavigate();
  return (
    <div>
      <input
        type="text"
        placeholder="Add Todo ..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {todos.map((todo) => (
        <div>
          <h4>{todo.todo}</h4>
          <button onClick={() => handleUpdate(todo)}>Update</button>
          <button onClick={() => handleDelete(todo.uidd)}>Delete</button>
        </div>
      ))}

      {isEdit ? (
        <div>
          <button onClick={handleEditConfirm}>Confirm</button>
        </div>
      ) : (
        <div>
          <button onClick={writeToDatabase}>Add</button>
        </div>
      )}

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Homepage;
