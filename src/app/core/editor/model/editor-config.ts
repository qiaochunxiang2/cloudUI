export class EditorConfig {
  public width = '100%';
  public height = '95%';
  public path = 'assets/editor.md/lib/';
  // public previewTheme = 'light'; // 预览区代码样式
  // public editorTheme = 'pastel-on-dark';  // 编辑区代码样式
  public codeFold: true;
  public searchReplace = true;
  public toolbar = true;    // 是否开启菜单栏，默认关闭
  public emoji = true;
  public taskList = true;
  public tex = true;     // 开启科学公式TeX语言支持，默认关闭
  public readOnly = false;    // 是否只读
  public tocm = true;   // Using [TOCM]
  public watch = true;   // 实时预览
  public previewCodeHighlight = true;  // 代码是否高亮
  public saveHTMLToTextarea = true;  //
  public markdown = '';
  public flowChart = true;
  public syncScrolling = true;
  public sequenceDiagram = true;
  public imageUpload = true;
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
  public imageUploadURL = 'http://localhost:8080/qiniu/upload';

  constructor() {
  }
}
