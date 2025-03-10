
//original form
<div className="container-fluid login-bg-container">
  <div className="container d-flex mt-4 justify-content-center align-item-center">
    <div
      className="card p-4 shadow-lg border-dark text-black"
      style={{
        width: "330px",
        background: "transparent",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <h5 className="text-center mb-4">Update Your Order</h5>
      <div className="form">
        <form action="">
          <div className="mb-3">
            {items.map((item) => (
              <div key={item.id}>
                <input
                  className="text-black"
                  type="radio"
                  onChange={(e) => setOrder(e.target.value)}
                  name="order_item"
                  value={item.id}
                />
                <label className="px-2">{item.name}</label>
              </div>
            ))}
          </div>
          <div className="d-grid">
            <button
              type="submit"
              onClick={updateOrder}
              className="btn btn-info mt-4"
            >
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
    {userOrder && <UserOrder userOrder={userOrder} />}
  </div>
</div>;


// edited form
 <>
      <div className="container d-flex mt-4 justify-content-center align-items-center">
        <div
          className="card p-4 shadow-lg border-dark text-black"
          style={{
            width: "330px",
            background: "transparent",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <h5 className="text-center mb-4">What you want now</h5>
          <div className="form">
            <form action="">
              <div className="mb-3">
                {items.map((item) => (
                  <div key={item.id}>
                    <input
                      className="text-black"
                      type="radio"
                      onChange={(e) => setOrder(e.target.value)}
                      name="order_item"
                      value={item.id}
                    />
                    <label className="px-2">
                      <b>{item.name}</b>
                    </label>
                  </div>
                ))}
              </div>

              <div className="container justify-content-center align-items-center">
                {!userOrderInfo && (
                  <div className="d-flex align-items-center justify-content-center ms-auto">
                    <button
                      type="submit"
                      onClick={handleOrder}
                      className=" btn border border-dark me-2 mb-3"
                      style={{
                        color: "white",
                        background: "black",
                        width: "50%",
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-center ms-auto">
                  <button
                    type="submit"
                    onClick={updateOrder}
                    className="btn border border-dark me-2"
                    style={{
                      color: "white",
                      background: "black",
                      width: "50%",
                    }}
                  >
                    Update Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {userOrder && <UserOrder userOrder={userOrder} />}
    </>





export default function Demo(){

  const URL =""

  useEffect(() => {
    async function fetchItem() {
      const response = await axios.get(URL);
      console.log(response.data)
      
    }
    fetchItem();
  }, []);

  return(
    <>
    <h1>Hello</h1>
    </>
  )
}