#!/bin/bash

mkdir Week_`echo $1`
touch Week_`echo $1`/Week_`echo $1`_Plan.desc.md
echo "# Week `echo $1`" > Week_`echo $1`/Week_`echo $1`_Plan.desc.md
touch Week_`echo $1`/Week_`echo $1`_Plan.notes.md
echo "# Week `echo $1` - Instructor Notes" > Week_`echo $1`/Week_`echo $1`_Plan.notes.md
