import { Button, Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const timeRef = useRef(null);
  const [milsecond, setMilsecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [runnig, setRunning] = useState(false);
  const [lap, setLap] = useState([]);

  //input Modal Lap
  const [inputModal, setInputModal] = useState(false);
  const showInput = () => {
    setInputModal(true);
  };
  const handOk = () => {
    setInputModal(false);
    onLap();
  };
  const handCancel = () => {
    setInputModal(false);
  };

  // Restar Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(recet);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeMilsecond = (previous) => {
    if (previous === 99) {
      setSecond(changeSecond);
      return 0;
    }
    return previous + 1;
  };

  const changeSecond = (previous) => {
    if (previous === 59) {
      setMinute(changeMinute);
      return 0;
    }
    return previous + 1;
  };

  const changeMinute = (previous) => {
    if (previous === 59) {
      setHour((previous) => {
        return previous + 1;
      });
      return 0;
    }
    return previous + 1;
  };

  useEffect(() => {
    if (runnig)
      timeRef.current = setInterval(() => {
        setMilsecond(changeMilsecond);
      }, 1);
    else clearInterval(timeRef.current);
  }, [runnig]);

  const recet = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setMilsecond(0);
    setRunning(false);
  };

  const onLap = () => {
    setLap((previous) => {
      return [
        ...previous,
        {
          hour,
          minute,
          second,
          milsecond,
          id: uuidv4(),
        },
      ];
    });
  };

  const onReset = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setMilsecond(0);
    setRunning(false);
    setLap([]);
  };

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center ">
      <div className="bg-rose-500 w-[60%] h-[80vh]">
        <div className="text-[200px] flex items-center justify-center">
          <h1>{hour} </h1>
          <h1>:</h1>
          <h1>{minute} </h1>
          <h1>:</h1>
          <h1>{second}</h1>
          <h1>:</h1>
          <h1>{milsecond}</h1>
        </div>
        <div className="flex items-center justify-center gap-[100px]">
          {milsecond ? (
            <Button
              onClick={() => {
                showInput();
              }}
              type="primary"
              size="large"
            >
              Lap
            </Button>
          ) : (
            <Button disabled>Lap</Button>
          )}
          <Modal
            title="Basic Modal"
            open={inputModal}
            onOk={handOk}
            onCancel={handCancel}
          >
            <input
              className="border-double border-4 border-indigo-600 "
              type="text"
              placeholder="kim..."
            />
          </Modal>
          {runnig ? (
            <Button
              type="primary"
              onClick={() => {
                setRunning(false);
              }}
            >
              Pause
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                setRunning(true);
              }}
            >
              star
            </Button>
          )}
          <Button onClick={showModal} className="bg-rose-50">
            Restart
          </Button>
          <Modal
            title="Vaqtni to'xtatamizmi!"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Sen chindanham uchirishni xohlaysanmi..???</p>
          </Modal>
        </div>
        <div className="w-full">
          {lap.map(({ id, hour, minute, second, milsecond }) => {
            return (
              <div key={id} className="flex ml-7">
                <h3>{hour}</h3>:<h3>{minute}</h3>:<h3>{second}</h3>:
                <h3>{milsecond}</h3>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center mt-[50px]">
          <Button
            onClick={() => {
              onReset();
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
