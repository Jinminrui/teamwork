from nginx
label maintainer "jinminrui"
copy ./build/ /usr/share/nginx/html/
expose 3009

