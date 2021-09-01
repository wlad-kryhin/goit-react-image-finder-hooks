const KEY = "22313175-89def84c9551dc3c20db3bc15";
export default function FetchApi(imageName, page) {
  const KEY = "22313175-89def84c9551dc3c20db3bc15";
  fetch(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(
        setError(new Error(`Запрос с именем ${imageName} не найдет `)),
      );
    })
    .then((data) => data.hits)
    .then((images) => {
      if (images.length === 0) {
        return setError("Nothing found, please enter a correct keyword!");
      }
      setImages((prevState) => [...prevState, ...images]);
    })
    .catch((error) => setError(error))
    .finally(() => setIsLoading(false));
}
