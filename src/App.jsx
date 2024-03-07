import { useState, useEffect, useRef } from "react";
import "./App.css";
import Edit from "../src/assets/edit.svg";
import Delete from "../src/assets/delete.svg";

function App() {
  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const toDoRef = useRef();
  const doingRef = useRef();
  const doneRef = useRef();

  function heandleClick(type) {
    if (type == "to do") {
      if (toDoRef.current.value) {
        const toDoData = {
          text: toDoRef.current.value,
          id: Date.now(),
        };
        let data = JSON.parse(localStorage.getItem("todo"))
          ? JSON.parse(localStorage.getItem("todo"))
          : [];
        data.push(toDoData);
        setToDo(data);
        localStorage.setItem("todo", JSON.stringify(data));
      } else {
        toDoRef.current.focus();
      }
      toDoRef.current.value = "";
    }
    if (type == "doing") {
      if (doingRef.current.value) {
        const toDoingData = {
          text: doingRef.current.value,
          id: Date.now(),
        };
        let data = JSON.parse(localStorage.getItem("doing"))
          ? JSON.parse(localStorage.getItem("doing"))
          : [];
        data.push(toDoingData);
        setDoing(data);
        localStorage.setItem("doing", JSON.stringify(data));
      } else {
        doingRef.current.focus();
      }
      doingRef.current.value = "";
    }
    if (type == "done") {
      if (doneRef.current.value) {
        const doneData = {
          text: doneRef.current.value,
          id: Date.now(),
        };
        let data = JSON.parse(localStorage.getItem("done"))
          ? JSON.parse(localStorage.getItem("done"))
          : [];
        data.push(doneData);
        setDone(data);
        localStorage.setItem("done", JSON.stringify(data));
      } else {
        doneRef.current.focus();
      }
      doneRef.current.value = "";
    }
  }
  useEffect(() => {
    if (localStorage.getItem("todo")) {
      setToDo(JSON.parse(localStorage.getItem("todo")));
    }
    if (localStorage.getItem("doing")) {
      setDoing(JSON.parse(localStorage.getItem("doing")));
    }
    if (localStorage.getItem("done")) {
      setDone(JSON.parse(localStorage.getItem("done")));
    }
    if (localStorage.getItem("all")) {
      setAll(JSON.parse(localStorage.getItem("all")));
    }
  }, []);

  function heandleDragStart(e, element) {
    e.dataTransfer.setData("todo", JSON.stringify(element));
  }

  const handleDrop = (event, type) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("todo"));

    let dataDone = JSON.parse(localStorage.getItem("done"))
      ? JSON.parse(localStorage.getItem("done"))
      : [];
    dataDone = dataDone.filter((el) => {
      return el.id != data.id;
    });
    let dataDoing = JSON.parse(localStorage.getItem("doing"))
      ? JSON.parse(localStorage.getItem("doing"))
      : [];
    dataDoing = dataDoing.filter((el) => {
      return el.id != data.id;
    });
    let dataDo = JSON.parse(localStorage.getItem("todo"))
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
    dataDo = dataDo.filter((el) => {
      return el.id != data.id;
    });

    setToDo(dataDo);
    setDoing(dataDoing);
    setDone(dataDone);

    if (type == "todo") {
      dataDo.push(data);
      localStorage.setItem("todo", JSON.stringify(dataDo));
    }
    if (type == "doing") {
      dataDoing.push(data);
      localStorage.setItem("doing", JSON.stringify(dataDoing));
    }
    if (type == "done") {
      dataDone.push(data);
      localStorage.setItem("done", JSON.stringify(dataDone));
    }
    localStorage.setItem("todo", JSON.stringify(dataDo));
    localStorage.setItem("doing", JSON.stringify(dataDoing));
    localStorage.setItem("done", JSON.stringify(dataDone));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  function heandleDelete(type, id) {
    if (type == "todo") {
      let data = JSON.parse(localStorage.getItem("todo"));
      data = data.filter((el) => {
        return el.id != id;
      });
      localStorage.setItem("todo", JSON.stringify(data));
      setToDo(data);
    }
    if (type == "doing") {
      let data = JSON.parse(localStorage.getItem("doing"));
      data = data.filter((el) => {
        return el.id != id;
      });
      localStorage.setItem("doing", JSON.stringify(data));
      setDoing(data);
    }
    if (type == "done") {
      let data = JSON.parse(localStorage.getItem("done"));
      data = data.filter((el) => {
        return el.id != id;
      });
      localStorage.setItem("done", JSON.stringify(data));
      setDone(data);
    }
  }

  function heandleChange(type, element) {
    if (type == "todo") {
      let data = JSON.parse(localStorage.getItem("todo"));
      data = data.filter((el) => {
        return el.id != element.id;
      });
      toDoRef.current.focus();
      toDoRef.current.value = element.text;
      localStorage.setItem("todo", JSON.stringify(data));
      setToDo(data);
    }
    if (type == "doing") {
      let data = JSON.parse(localStorage.getItem("doing"));
      data = data.filter((el) => {
        return el.id != element.id;
      });
      doingRef.current.focus();
      doingRef.current.value = element.text;
      localStorage.setItem("doing", JSON.stringify(data));
      setDoing(data);
    }
    if (type == "done") {
      let data = JSON.parse(localStorage.getItem("done"));
      data = data.filter((el) => {
        return el.id != element.id;
      });
      doneRef.current.focus();
      doneRef.current.value = element.text;
      localStorage.setItem("done", JSON.stringify(data));
      setDone(data);
    }
  }

  return (
    <div className="wrapper">
      <div className="heading">
        <h2>Menage items</h2>
      </div>
      <div className="items">
        <div
          droppable
          onDrop={(e) => handleDrop(e, "todo")}
          onDragOver={handleDragOver}
          className="toDo"
        >
          <div className="default">
            <h3>WORK</h3>
            <div className="inp__btn">
              <input ref={toDoRef} type="text" placeholder="Enter to do..." />
              <button onClick={() => heandleClick("to do")}>Add</button>
            </div>
          </div>
          <div className="list__wrapper">
            {toDo
              ? toDo.map((el, index) => {
                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => heandleDragStart(e, el)}
                      className="list"
                    >
                      <p>{el.text}</p>
                      <div className="actions">
                        <img
                          onClick={() => heandleChange("todo", el)}
                          src={Edit}
                          alt=""
                          width={17}
                        />
                        <img
                          onClick={() => heandleDelete("todo", el.id)}
                          src={Delete}
                          alt=""
                          width={17}
                        />
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div
          droppable
          onDrop={(e) => handleDrop(e, "doing")}
          onDragOver={handleDragOver}
          className="doing"
        >
          <div className="default">
            <h3>DOING</h3>
            <div className="inp__btn">
              <input
                ref={doingRef}
                type="text"
                placeholder="Enter doing work..."
              />
              <button onClick={() => heandleClick("doing")}>Add</button>
            </div>
          </div>
          <div className="list__wrapper">
            {doing
              ? doing.map((el, index) => {
                  return (
                    <div
                      key={index}
                      onDragStart={(e) => heandleDragStart(e, el)}
                      draggable
                      className="list"
                    >
                      <p>{el.text}</p>
                      <div className="actions">
                        <img
                          onClick={() => heandleChange("doing", el)}
                          src={Edit}
                          alt=""
                          width={17}
                        />
                        <img
                          onClick={() => heandleDelete("doing", el.id)}
                          src={Delete}
                          alt=""
                          width={17}
                        />
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div
          droppable
          onDrop={(e) => handleDrop(e, "done")}
          onDragOver={handleDragOver}
          className="done"
        >
          <div className="default">
            <h3>DONE</h3>
            <div className="inp__btn">
              <input
                ref={doneRef}
                type="text"
                placeholder="Enter done work..."
              />
              <button onClick={() => heandleClick("done")}>Add</button>
            </div>
          </div>
          <div className="list__wrapper">
            {done
              ? done.map((el, index) => {
                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => heandleDragStart(e, el)}
                      className="list"
                    >
                      <p>{el.text}</p>
                      <div className="actions">
                        <img
                          onClick={() => heandleChange("done", el)}
                          src={Edit}
                          alt=""
                          width={17}
                        />
                        <img
                          onClick={() => heandleDelete("done", el.id)}
                          src={Delete}
                          alt=""
                          width={17}
                        />
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
