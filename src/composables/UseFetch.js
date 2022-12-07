import { toRefs, reactive } from 'vue';

async export function useFetch(url, options) {
  //https://vuejs.org/api/reactivity-core.html#reactive
  
  const state = reactive({
    error: null,
    loading: false,
    data: null,
    ready: false,
  });
  /*
  https://medium.com/nerd-for-tech/fetch-api-async-await-in-a-few-bites-6b4f19f7db9e
*/
  const fetchData = async () => {
    state.loading = true;
    console.log('Start fetching data ...');
    try {
      const res = await fetch(url, options);
      //console.log('Result afer fetch:  ' + res.status);
      //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      if (res.status != 200) {
        state.error="Status Code: " + res.status;
      }
      else {
        state.data = await res.json();
        console.log(" done json")
      }
    } catch (e) {
      state.error = e;
    } finally {
      state.loading = false;
      state.ready = true;
    }
  };

  fetchData();
  //https://vuejs.org/api/reactivity-utilities.html#isref
  return { ...toRefs(state) };
}
