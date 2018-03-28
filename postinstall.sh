#!/usr/bin/env bash
sed -s ./node_modules/@types/react-native/index.d.ts <<< $',s/declare global/declare namespace FuckGlobals/g\nw'
