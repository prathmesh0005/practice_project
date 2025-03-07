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