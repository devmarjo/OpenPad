import { defineStore } from 'pinia';
import { apiVersions } from 'src/boot/axios';
interface Version {
  id: number,
  version: string;
  date: Date;
}
type VersionList = Array<Version>

export const useVersionsStore = defineStore('counter', {
  state: () => ({
    list: <VersionList>[],
    key: <string> ''
  }),

  getters: {
    getNewer (state) {
      if (state.list.length > 0) {
        return state.list[0];
      } else {
        return false
      }
    }
  },

  actions: {
    async updateList (key: string) {
      this.key = key
      apiVersions.get(`/${key}`).then(res => {
        if (res.data?.length > 0) {
          this.list = res.data
        }
      }).catch( err => console.log(err))
    },
    clean() {
      this.key = ''
      this.list = []
    }
  }
});
