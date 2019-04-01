# bob-webinterface

## Introduction

This is a demo webinterface for the BOB project build with VueJS.
To test it set up a FiPy with the [demo webserver](https://github.com/vkuhlen/bob-webserver-demo). Rename `.env.example` to `.env` and edit it to add the URL or IP of your FiPy.

### How to find the FiPys IP

#### FiPy REPL

If you have access to the REPL you can find the IP with
```python
import network
w = network.WLAN(id=0)
w.ifconfig()[0]
```

#### Using `nmap` (Linux only)

First open a console window.
Find your PCs IP address with
```
ip addr | grep 'inet '
```

Then type
```
nmap -sn [YOUR IP ADDRESS]/24
```
This will display all devices in your LAN. If one device is called `espressif` it is your FiPy. If there is no such device listed you have to try all IP addresses.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
