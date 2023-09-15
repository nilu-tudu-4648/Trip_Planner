import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : "12.73428884772176",
          tr_latitude: tr_lat ? tr_lat : "13.17370600858147",
          bl_longitude: bl_lng ? bl_lng : "77.37919807560223",
          tr_longitude: tr_lng ? tr_lng : "77.88268086666527",
          limit: "30",
          currency: "USD",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          'X-RapidAPI-Key': 'f74e8c27c6msh44cdab487133875p1b4000jsnbc235a72e178',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
