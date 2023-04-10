import { defineStore } from 'pinia'

export const multipleSelectedData = defineStore('MultipleSelectedData', {
    state: () => ({
        selectedList: [],
    }),
    actions: {
      addItem(item){
        this.selectedList.push(item);
      },

      removeItemFromList(index) {
        let arr = [];
        for (let i = 0; i < this.selectedList.length; i++) {
          if (i !== index) {
            arr.push(this.selectedList[i]);
          }
        }
        this.selectedList = arr;
      },
    }
  })