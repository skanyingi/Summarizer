// Simple singleton store for the prototype
export const fileStore = {
  currentFile: null as File | null,
  setFile(file: File | null) {
    this.currentFile = file;
  },
  getFile() {
    return this.currentFile;
  }
};
