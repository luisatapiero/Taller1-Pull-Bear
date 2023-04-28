async function getData() {
  try {
    let gettingData = await fetch ('https://apimocha.com/pullandbear-products/see-all');
    let data = await gettingData.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

export default getData;





            