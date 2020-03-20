# Architectures
## SZMC v0 old architecture
v0는 다음과 같은 모듈로 나뉘어 집니다.
[https://github.com/KUR-creative/SickZil-Machine/tree/master/src](https://github.com/KUR-creative/SickZil-Machine/tree/master/src)

**gui / core / state / imgio**

**gui**: GUI 기능을 구현합니다. (gui.py, imListModel.py, qml/szmc-0.1.0.qml)
**core**: 딥러닝 모델을 실행합니다. 모델 로드, 입출력 이미지 전처리를 합니다. (core.py)
**state**: 현재 열고 있는 프로젝트 폴더의 이미지 파일 이름 리스트를 관리합니다.(state.py)
**imgio**: 파일의 입출력을 관리합니다.(imgio.py)
utils: 유틸리티 모음(imutils.py, futils.py, fp.py)
 
 큰 틀은 위와 같다고 생각하시면 될 것 같습니다.
