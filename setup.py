import setuptools

with open('README.md', 'r') as fh:
    long_description = fh.read()

setuptools.setup(
    name='apple-music-token-generator',
    version='0.0.1',
    author='',
    author_email='',
    description='Generate tokens for Apple Music',
    long_description=long_description,
    long_description_content_type='text/markdown',
    python_requires='>=3.6',
    url='https://github.com/IdoBn/apple-music-token-generator',
    packages=setuptools.find_packages(),
    install_requires=[
        'Click==7.0',
        'PyJWT==1.7.1'
    ],
    entry_points = {
        'console_scripts': ['apple-music-token=music_token.command_line:main'],
    },
    classifiers=[
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent'
    ]
)