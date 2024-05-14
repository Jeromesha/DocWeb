export class CommonInfo {
  public static taskData: any = {};

  public static clearTaskData(): void {
    this.taskData = {};
    localStorage.removeItem('taskData');
  }
}